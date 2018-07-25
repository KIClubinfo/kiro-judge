from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication

class TokenAuthentication(BaseTokenAuthentication):
    keyword = 'Bearer'

    def authenticate(self, request):
        key = request.query_params.get('authorization', '').strip()
        if key:
            return self.authenticate_credentials(key)

        return super().authenticate(request)
