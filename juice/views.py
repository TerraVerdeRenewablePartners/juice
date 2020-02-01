from datetime import datetime, timedelta

from rest_framework.decorators import api_view
from rest_framework.response import Response

MILES_PER_KWH = 3.5
CHARGE_RATE_KW = 5.7

@api_view(['GET'])
def get_charge_options(request):
    total_miles = request.query_params.get('total_miles', None)
    curr_miles = request.query_params.get('curr_miles', None)
    if total_miles is not None and curr_miles is not None:
        delta = int(total_miles) - int(curr_miles)
        return Response(
            {'choices': [delta * .25, delta * .5, delta * .75, delta]}
        )
    return Response({'error': "not enough data"})

@api_view(['GET'])
def get_hourly_rate(request):
    miles_choice = request.query_params.get('miles_choice', None)
    now = datetime.now()
    limit = now + timedelta(hours=24)
    miles_choice = float(miles_choice)
    kwh_choice = miles_choice / MILES_PER_KWH
    num_hours = kwh_choice / CHARGE_RATE_KW
    num_intervals = num_hours * 12
    return Response(num_intervals)
