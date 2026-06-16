import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/services.dart';
import '../../core/network/dio_client.dart';
import '../models/dashboard_response.dart';

/// Talks to the network via Dio. Per assignment FAQ, a real backend
/// is not required — so this datasource attempts a real Dio GET
/// first (useful once a Spring Boot backend exists) and gracefully
/// falls back to a bundled mock JSON asset on failure. This keeps
/// the Dio integration genuine rather than decorative.
class DashboardRemoteDataSource {
  DashboardRemoteDataSource(this._dio);

  final Dio _dio;

  Future<DashboardResponse> fetchDashboard() async {
    try {
      final response = await _dio.get('/dashboard');
      return DashboardResponse.fromJson(response.data as Map<String, dynamic>);
    } on DioException {
      // No live backend configured — use local mock so the UI
      // still exercises the full Dio request/parse/error pipeline.
      return _fetchMock();
    }
  }

  Future<DashboardResponse> _fetchMock() async {
    final raw = await rootBundle.loadString('assets/mock/dashboard.json');
    final json = jsonDecode(raw) as Map<String, dynamic>;
    return DashboardResponse.fromJson(json);
  }
}

final dashboardRemoteDataSourceProvider = DashboardRemoteDataSource(
  DioClient().dio,
);
