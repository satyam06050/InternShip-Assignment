// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dashboard_providers.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$dashboardRemoteDataSourceHash() =>
    r'f59967450a3762ba9a1521c116a70eeb20815b48';

/// See also [dashboardRemoteDataSource].
@ProviderFor(dashboardRemoteDataSource)
final dashboardRemoteDataSourceProvider =
    AutoDisposeProvider<DashboardRemoteDataSource>.internal(
  dashboardRemoteDataSource,
  name: r'dashboardRemoteDataSourceProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$dashboardRemoteDataSourceHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef DashboardRemoteDataSourceRef
    = AutoDisposeProviderRef<DashboardRemoteDataSource>;
String _$dashboardRepositoryHash() =>
    r'5a8fce339f8fd826273081df3d529fa8aaf58d25';

/// See also [dashboardRepository].
@ProviderFor(dashboardRepository)
final dashboardRepositoryProvider =
    AutoDisposeProvider<DashboardRepository>.internal(
  dashboardRepository,
  name: r'dashboardRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$dashboardRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef DashboardRepositoryRef = AutoDisposeProviderRef<DashboardRepository>;
String _$dashboardHash() => r'a947ca2d1009139a64b35d92108ead527693ef5f';

/// AsyncNotifier exposes loading / data / error states natively —
/// the UI switches on `AsyncValue` instead of manual flags.
///
/// Copied from [Dashboard].
@ProviderFor(Dashboard)
final dashboardProvider =
    AutoDisposeAsyncNotifierProvider<Dashboard, DashboardResponse>.internal(
  Dashboard.new,
  name: r'dashboardProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$dashboardHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef _$Dashboard = AutoDisposeAsyncNotifier<DashboardResponse>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
