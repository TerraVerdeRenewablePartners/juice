from datetime import timedelta, datetime
import pytz
from math import floor, ceil

from django.utils import timezone
import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response

MILES_PER_KWH = 3.5
CHARGE_RATE_KW = 5.7


@api_view(['GET'])
def get_hourly_rate(request):
    pacific = pytz.timezone('US/Pacific')
    miles_choice = request.query_params.get('miles_choice', None)
    now = datetime(2019, 2, 8, 21, tzinfo=pacific) # - timedelta(days=365)
    miles_choice = float(miles_choice)
    kwh_choice = miles_choice / MILES_PER_KWH
    num_hours = kwh_choice / CHARGE_RATE_KW
    num_intervals = num_hours * 12
    num_full_intervals = floor(num_intervals)
    remainder = num_intervals - num_full_intervals

    real_time = pd.read_csv('juice/media/price_data_2019.csv')
    real_time['start'] = pd.to_datetime(real_time['date/time'])
    real_time['start'] = real_time['start'].dt.tz_localize(
        pacific,
        ambiguous=True,
        nonexistent='shift_forward',
    )
    cns = pd.read_csv('juice/media/number_of_leafs_ghg.csv')
    cns.set_index('2022', inplace=True)

    baseline_chunk = real_time[
        (real_time['start'] >= now) &
        (real_time['start'] <= now + timedelta(hours=ceil(num_hours)))
    ].sort_values('PG&E Bundled')
    baseline = 0
    cns_map = {}
    for _, row in baseline_chunk[:num_full_intervals].iterrows():
        baseline += row['PG&E Bundled']
        month_hour = (
            row['start'].month,
            row['start'].hour if row['start'].hour else 24,
        )
        if month_hour not in cns_map:
            cns_map[month_hour] = 0
        cns_map[month_hour] += 1
    baseline += baseline_chunk['PG&E Bundled'][
        num_full_intervals:num_full_intervals + 1].sum() * remainder
    baseline /= num_intervals
    baseline *= kwh_choice

    baseline_ghg = 0
    for key, val in cns_map.items():
        month, hour = key
        baseline_ghg += cns.loc[hour, str(month)] * val
    baseline_ghg /= num_full_intervals

    resp = {'baseline': baseline, 'baseline_ghg': baseline_ghg}
    for i in range(1, 25):
        chunk = real_time[
            (real_time['start'] >= now) &
            (real_time['start'] <= now + timedelta(hours=i))
        ]
        if num_intervals > chunk.start.count():
            continue
        sorted_chunk = chunk.sort_values('Total Energy Price')
        total = 0
        cns_map = {}
        for _, row in sorted_chunk[:num_full_intervals].iterrows():
            total += row['Total Energy Price']
            month_hour = (
                row['start'].month,
                row['start'].hour if row['start'].hour else 24,
            )
            if month_hour not in cns_map:
                cns_map[month_hour] = 0
            cns_map[month_hour] += 1
        total += sorted_chunk['Total Energy Price'][
            num_full_intervals:num_full_intervals + 1].sum() * remainder
        total /= num_intervals
        total *= kwh_choice

        total_ghg = 0
        for key, val in cns_map.items():
            month, hour = key
            total_ghg += cns.loc[hour, str(month)] * val
        total_ghg /= num_full_intervals
        resp[i] = {
            'total': total,
            'ghg': total_ghg,
            'timestamp': now + timedelta(hours=i),
        }

    return Response(resp)
