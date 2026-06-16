// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'summary_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$SummaryModelImpl _$$SummaryModelImplFromJson(Map<String, dynamic> json) =>
    _$SummaryModelImpl(
      totalVendors: (json['totalVendors'] as num).toInt(),
      totalCollected: (json['totalCollected'] as num).toInt(),
      totalOutstanding: (json['totalOutstanding'] as num).toInt(),
    );

Map<String, dynamic> _$$SummaryModelImplToJson(_$SummaryModelImpl instance) =>
    <String, dynamic>{
      'totalVendors': instance.totalVendors,
      'totalCollected': instance.totalCollected,
      'totalOutstanding': instance.totalOutstanding,
    };
