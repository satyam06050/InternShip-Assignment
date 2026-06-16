import 'package:dio/dio.dart';

/// Thin wrapper around Dio so the rest of the app never imports
/// `package:dio` directly. Makes it trivial to swap base URL,
/// add auth headers, or point to a real backend later.
class DioClient {
  DioClient._internal() {
    _dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    _dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        error: true,
      ),
    );
  }

  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;

  static const String baseUrl = 'https://api.vixact.mock/v1';

  late final Dio _dio;
  Dio get dio => _dio;
}
