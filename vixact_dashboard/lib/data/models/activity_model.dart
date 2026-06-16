import 'package:freezed_annotation/freezed_annotation.dart';

part 'activity_model.freezed.dart';
part 'activity_model.g.dart';

enum ActivityType {
  @JsonValue('payment')
  payment,
  @JsonValue('vendor_added')
  vendorAdded,
  @JsonValue('event_updated')
  eventUpdated,
}

@freezed
class ActivityModel with _$ActivityModel {
  const factory ActivityModel({
    required String id,
    required ActivityType type,
    required String title,
    required DateTime timestamp,
  }) = _ActivityModel;

  factory ActivityModel.fromJson(Map<String, dynamic> json) =>
      _$ActivityModelFromJson(json);
}
