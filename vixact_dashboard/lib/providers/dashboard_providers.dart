import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../core/network/dio_client.dart';
import '../data/datasources/dashboard_remote_datasource.dart';
import '../data/models/dashboard_response.dart';
import '../data/repositories/dashboard_repository.dart';

part 'dashboard_providers.g.dart';

@riverpod
DashboardRemoteDataSource dashboardRemoteDataSource(Ref ref) {
  return DashboardRemoteDataSource(DioClient().dio);
}

@riverpod
DashboardRepository dashboardRepository(Ref ref) {
  return DashboardRepositoryImpl(ref.watch(dashboardRemoteDataSourceProvider));
}

/// AsyncNotifier exposes loading / data / error states natively —
/// the UI switches on `AsyncValue` instead of manual flags.
@riverpod
class Dashboard extends _$Dashboard {
  @override
  Future<DashboardResponse> build() {
    return ref.watch(dashboardRepositoryProvider).getDashboard();
  }

  Future<void> refresh() async {
    ref.invalidateSelf();
    await future;
  }
}
