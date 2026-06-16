import 'package:freezed_annotation/freezed_annotation.dart';
import 'activity_model.dart';
import 'event_model.dart';
import 'summary_model.dart';

part 'dashboard_response.freezed.dart';
part 'dashboard_response.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String name,
    required int unreadNotifications,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

@freezed
class DashboardResponse with _$DashboardResponse {
  const factory DashboardResponse({
    required UserModel user,
    required SummaryModel summary,
    required List<EventModel> events,
    required List<ActivityModel> recentActivity,
  }) = _DashboardResponse;

  factory DashboardResponse.fromJson(Map<String, dynamic> json) =>
      _$DashboardResponseFromJson(json);
}
