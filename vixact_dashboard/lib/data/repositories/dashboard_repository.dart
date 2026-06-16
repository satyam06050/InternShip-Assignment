import '../datasources/dashboard_remote_datasource.dart';
import '../models/dashboard_response.dart';

abstract class DashboardRepository {
  Future<DashboardResponse> getDashboard();
}

class DashboardRepositoryImpl implements DashboardRepository {
  DashboardRepositoryImpl(this._remote);

  final DashboardRemoteDataSource _remote;

  @override
  Future<DashboardResponse> getDashboard() => _remote.fetchDashboard();
}
