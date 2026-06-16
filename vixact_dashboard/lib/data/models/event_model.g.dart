// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'event_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$EventModelImpl _$$EventModelImplFromJson(Map<String, dynamic> json) =>
    _$EventModelImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      date: json['date'] as String,
      vendorCount: (json['vendorCount'] as num).toInt(),
      collected: (json['collected'] as num).toInt(),
      pending: (json['pending'] as num).toInt(),
      colorTag: json['colorTag'] as String,
    );

Map<String, dynamic> _$$EventModelImplToJson(_$EventModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'date': instance.date,
      'vendorCount': instance.vendorCount,
      'collected': instance.collected,
      'pending': instance.pending,
      'colorTag': instance.colorTag,
    };
