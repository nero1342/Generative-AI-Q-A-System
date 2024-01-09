from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

import logging 
logging.basicConfig(level = logging.INFO)

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Generative QA System"
    # SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    # ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    # SERVER_NAME: str
    # SERVER_HOST: AnyHttpUrl
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'

    
settings = Settings()