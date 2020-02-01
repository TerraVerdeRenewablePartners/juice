from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_charge_options(request):
    total_miles = request.query_params.get('total_miles', None)
    curr_miles = request.query_params.get('curr_miles', None)
    if total_miles is not None and curr_miles is not None:
        return Response({'choices': [1, 2, 3]})