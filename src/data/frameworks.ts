export interface Framework {
  slug: string;
  name: string;
  description: string;
  jwtLibrary: string;
  category: "frontend" | "backend" | "fullstack";
  features: string[];
  codeExample: string;
  setupSteps: string[];
}

export const frameworks: Framework[] = [
  {
    slug: "nextjs",
    name: "Next.js",
    description: "Next.js is a React framework for production that provides server-side rendering, static site generation, and API routes. JWT tokens are commonly used in Next.js apps for authentication via middleware, API routes, and server components.",
    jwtLibrary: "jose",
    category: "fullstack",
    features: ["Middleware-based auth protection", "Server component token verification", "API route JWT handling", "Edge runtime compatible"],
    codeExample: `import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect('/login');
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    request.nextauth = { user: payload };
  } catch {
    return NextResponse.redirect('/login');
  }
}`,
    setupSteps: [
      "Install jose: npm install jose",
      "Create middleware.ts in your project root",
      "Add JWT verification in the middleware",
      "Use getServerSession() in server components",
      "Protect API routes with token validation",
    ],
  },
  {
    slug: "react",
    name: "React",
    description: "React is the most popular JavaScript library for building user interfaces. In React SPAs, JWT tokens are typically stored in memory or httpOnly cookies and sent with API requests for authentication.",
    jwtLibrary: "jwt-decode",
    category: "frontend",
    features: ["Client-side token decoding", "Auth context provider pattern", "Protected route components", "Token refresh logic"],
    codeExample: `import { jwtDecode } from 'jwt-decode';

function useAuth() {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const { token } = await res.json();
    const decoded = jwtDecode(token);
    setUser(decoded);
    localStorage.setItem('token', token);
  };
  
  return { user, login };
}`,
    setupSteps: [
      "Install jwt-decode: npm install jwt-decode",
      "Create an AuthContext provider",
      "Decode token on login and store user info",
      "Build ProtectedRoute wrapper component",
      "Add token refresh interceptor with axios",
    ],
  },
  {
    slug: "vue",
    name: "Vue.js",
    description: "Vue.js is a progressive JavaScript framework for building web interfaces. Vue apps commonly use JWT for stateless authentication, with Pinia or Vuex managing the auth state and Vue Router guards protecting routes.",
    jwtLibrary: "jwt-decode",
    category: "frontend",
    features: ["Pinia auth store", "Router navigation guards", "Axios interceptors for tokens", "Composable auth hooks"],
    codeExample: `import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, user: null }),
  actions: {
    async login(credentials) {
      const { data } = await api.post('/login', credentials);
      this.token = data.token;
      this.user = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});`,
    setupSteps: [
      "Install dependencies: npm install jwt-decode pinia",
      "Create Pinia auth store with login/logout actions",
      "Add axios interceptor to attach Bearer token",
      "Set up router beforeEach guard for protected routes",
      "Create useAuth composable for components",
    ],
  },
  {
    slug: "angular",
    name: "Angular",
    description: "Angular is a TypeScript-based web framework by Google. Angular applications use JWT tokens with HttpInterceptors for automatic token attachment and AuthGuards for route protection.",
    jwtLibrary: "@auth0/angular-jwt",
    category: "frontend",
    features: ["HttpInterceptor for Bearer tokens", "Route CanActivate guards", "RxJS-based auth service", "Token refresh with switchMap"],
    codeExample: `import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getTokenExpirationDate(token: string): Date | null {
    return this.jwtHelper.getTokenExpirationDate(token);
  }
}`,
    setupSteps: [
      "Install: npm install @auth0/angular-jwt",
      "Configure JwtModule in AppModule with tokenGetter",
      "Create AuthGuard implementing CanActivate",
      "Build AuthInterceptor for automatic token attachment",
      "Add refresh token logic with HttpClient",
    ],
  },
  {
    slug: "express",
    name: "Express.js",
    description: "Express.js is the most popular Node.js web framework. It's widely used to build REST APIs that issue and verify JWT tokens for stateless authentication.",
    jwtLibrary: "jsonwebtoken",
    category: "backend",
    features: ["Middleware-based JWT verification", "Token generation on login", "Role-based access control", "Refresh token rotation"],
    codeExample: `const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Usage
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});`,
    setupSteps: [
      "Install: npm install jsonwebtoken",
      "Create auth middleware to verify tokens",
      "Generate JWT on successful login",
      "Apply middleware to protected routes",
      "Implement refresh token endpoint",
    ],
  },
  {
    slug: "django",
    name: "Django",
    description: "Django is a high-level Python web framework. Django REST Framework with SimpleJWT or djangorestframework-simplejwt provides robust JWT authentication for API endpoints.",
    jwtLibrary: "djangorestframework-simplejwt",
    category: "backend",
    features: ["DRF authentication classes", "Token obtain/refresh views", "Custom token claims", "Blacklist app for revocation"],
    codeExample: `from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
    })`,
    setupSteps: [
      "Install: pip install djangorestframework-simplejwt",
      "Add REST_FRAMEWORK and SIMPLE_JWT to settings.py",
      "Configure AUTHENTICATION_CLASSES with JWTAuthentication",
      "Add token obtain and refresh URLs to urls.py",
      "Customize TokenObtainPairSerializer for extra claims",
    ],
  },
  {
    slug: "flask",
    name: "Flask",
    description: "Flask is a lightweight Python web framework. Flask-JWT-Extended provides comprehensive JWT support including access tokens, refresh tokens, and token revocation.",
    jwtLibrary: "Flask-JWT-Extended",
    category: "backend",
    features: ["Access and refresh token pairs", "Token blocklist with Redis", "JWT in cookies or headers", "Custom decorator for roles"],
    codeExample: `from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)`,
    setupSteps: [
      "Install: pip install Flask-JWT-Extended",
      "Configure JWT_SECRET_KEY in app config",
      "Initialize JWTManager with your Flask app",
      "Create login endpoint with create_access_token",
      "Protect routes with @jwt_required() decorator",
    ],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    description: "FastAPI is a modern Python web framework with automatic OpenAPI docs. It has built-in OAuth2 with JWT support through the python-jose library and security utilities.",
    jwtLibrary: "python-jose",
    category: "backend",
    features: ["OAuth2PasswordBearer scheme", "Dependency injection for auth", "Auto-generated OpenAPI docs", "Async token verification"],
    codeExample: `from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "your-secret-key"

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401)
        return username
    except JWTError:
        raise HTTPException(status_code=401)`,
    setupSteps: [
      "Install: pip install python-jose[cryptography] passlib[bcrypt]",
      "Set up OAuth2PasswordBearer with token URL",
      "Create token generation function with python-jose",
      "Build get_current_user dependency",
      "Use Depends(get_current_user) in protected endpoints",
    ],
  },
  {
    slug: "spring-boot",
    name: "Spring Boot",
    description: "Spring Boot is the leading Java framework for enterprise applications. JWT authentication in Spring Boot is typically implemented with Spring Security filters and the jjwt library.",
    jwtLibrary: "jjwt (io.jsonwebtoken)",
    category: "backend",
    features: ["Spring Security filter chain", "JwtAuthenticationFilter", "Role-based authorization", "Stateless session management"],
    codeExample: `import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(key)
            .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key).build()
            .parseClaimsJws(token).getBody();
    }
}`,
    setupSteps: [
      "Add jjwt dependency to pom.xml or build.gradle",
      "Create JwtUtil class for token generation and validation",
      "Build JwtAuthenticationFilter extending OncePerRequestFilter",
      "Configure SecurityFilterChain to use the JWT filter",
      "Set session management to STATELESS",
    ],
  },
  {
    slug: "laravel",
    name: "Laravel",
    description: "Laravel is the most popular PHP framework. Laravel Passport and Laravel Sanctum provide JWT-like token authentication, while tymon/jwt-auth offers full JWT support.",
    jwtLibrary: "tymon/jwt-auth",
    category: "backend",
    features: ["JWT auth guard", "Token refresh and blacklist", "Middleware groups", "Eloquent user provider"],
    codeExample: `use Tymon\\JWTAuth\\Facades\\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }

    public function me()
    {
        return response()->json(JWTAuth::parseToken()->authenticate());
    }
}`,
    setupSteps: [
      "Install: composer require tymon/jwt-auth",
      "Publish config: php artisan vendor:publish --provider=TymonJWTAuth",
      "Generate secret: php artisan jwt:secret",
      "Configure auth guard to use jwt driver",
      "Create AuthController with login/me/logout methods",
    ],
  },
  {
    slug: "nestjs",
    name: "NestJS",
    description: "NestJS is a progressive Node.js framework built with TypeScript. It integrates seamlessly with @nestjs/jwt and @nestjs/passport for robust JWT authentication using guards and strategies.",
    jwtLibrary: "@nestjs/jwt + passport-jwt",
    category: "backend",
    features: ["JwtStrategy with Passport", "Decorator-based guards", "Modular architecture", "Refresh token rotation"],
    codeExample: `import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

// Guard usage
@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}`,
    setupSteps: [
      "Install: npm install @nestjs/jwt @nestjs/passport passport-jwt",
      "Create JwtStrategy extending PassportStrategy",
      "Configure JwtModule.register() with secret and expiresIn",
      "Build JwtAuthGuard extending AuthGuard('jwt')",
      "Apply @UseGuards(JwtAuthGuard) to protected controllers",
    ],
  },
  {
    slug: "rails",
    name: "Ruby on Rails",
    description: "Ruby on Rails is a full-stack web framework. JWT authentication in Rails API mode is commonly implemented with the jwt gem for stateless token-based auth.",
    jwtLibrary: "jwt (ruby gem)",
    category: "backend",
    features: ["API-only mode support", "Token encode/decode service", "Before_action auth filter", "Token expiration handling"],
    codeExample: `class AuthToken
  SECRET = Rails.application.credentials.secret_key_base

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET, true, algorithm: 'HS256')
    HashWithIndifferentAccess.new(decoded.first)
  rescue JWT::ExpiredSignature
    nil
  rescue JWT::DecodeError
    nil
  end
end`,
    setupSteps: [
      "Add jwt gem to Gemfile: gem 'jwt'",
      "Create AuthToken service class for encode/decode",
      "Add before_action :authenticate_user! in controllers",
      "Implement login action returning token JSON",
      "Set up token refresh endpoint",
    ],
  },
];

export function getFrameworkBySlug(slug: string): Framework | undefined {
  return frameworks.find((f) => f.slug === slug);
}

export function getAllFrameworkSlugs(): string[] {
  return frameworks.map((f) => f.slug);
}
