from datetime import timedelta
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
    miles_choice = request.query_params.get('miles_choice', None)
    now = timezone.now() - timedelta(days=365)
    miles_choice = float(miles_choice)
    kwh_choice = miles_choice / MILES_PER_KWH
    num_hours = kwh_choice / CHARGE_RATE_KW
    num_intervals = num_hours * 12
    num_full_intervals = floor(num_intervals)
    remainder = num_intervals - num_full_intervals

    real_time = pd.read_csv('juice/media/price_data_2019.csv')
    real_time['start'] = pd.to_datetime(real_time['date/time'])
    real_time['start'] = real_time['start'].dt.tz_localize(
        pytz.timezone('US/Pacific'),
        ambiguous=True,
        nonexistent='shift_forward',
    )

    baseline_chunk = real_time[
        (real_time['start'] >= now) &
        (real_time['start'] <= now + timedelta(hours=ceil(num_hours)))
    ].sort_values('PG&E Bundled')
    baseline = baseline_chunk['PG&E Bundled'][:num_full_intervals].sum()
    baseline += baseline_chunk['PG&E Bundled'][
        num_full_intervals:num_full_intervals + 1].sum() * remainder
    baseline /= num_intervals
    baseline *= kwh_choice

    resp = {}
    for i in range(1, 25):
        chunk = real_time[
            (real_time['start'] >= now) &
            (real_time['start'] <= now + timedelta(hours=i))
        ]
        if num_intervals > chunk.start.count():
            continue
        sorted_chunk = chunk.sort_values('Total Energy Price')
        total = sorted_chunk['Total Energy Price'][:num_full_intervals].sum()
        total += sorted_chunk['Total Energy Price'][
            num_full_intervals:num_full_intervals + 1].sum() * remainder
        total /= num_intervals
        total *= kwh_choice
        resp[i] = {
            'total': total,
            'baseline': baseline,
            'timestamp': now + timedelta(hours=i),
        }

    return Response(resp)
