import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/models/activity_model.dart';

class ActivityTile extends StatelessWidget {
  const ActivityTile({super.key, required this.activity});

  final ActivityModel activity;

  ({IconData icon, Color bg, Color fg}) get _style {
    switch (activity.type) {
      case ActivityType.payment:
        return (
          icon: Icons.arrow_downward,
          bg: AppColors.successBg,
          fg: AppColors.success
        );
      case ActivityType.vendorAdded:
        return (
          icon: Icons.person_add_alt_1,
          bg: AppColors.infoBg,
          fg: AppColors.primary
        );
      case ActivityType.eventUpdated:
        return (
          icon: Icons.event_note,
          bg: const Color(0xFFFCEFE3),
          fg: AppColors.warning
        );
    }
  }

  String get _relativeTime {
    final now = DateTime.now();
    final diff = now.difference(activity.timestamp);
    if (diff.inHours < 20 && diff.inHours >= 0 && now.day == activity.timestamp.day) {
      return DateFormat('h:mm a').format(activity.timestamp);
    } else if (diff.inDays == 1) {
      return 'Yesterday';
    } else if (diff.inDays > 1) {
      return '${diff.inDays} days ago';
    }
    return DateFormat('d MMM').format(activity.timestamp);
  }

  @override
  Widget build(BuildContext context) {
    final s = _style;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(color: s.bg, shape: BoxShape.circle),
            child: Icon(s.icon, size: 16, color: s.fg),
          ),
          const SizedBox(width: AppSpacing.sm),
          Expanded(
            child: Text(
              activity.title,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: AppColors.textPrimary,
              ),
            ),
          ),
          Text(
            _relativeTime,
            style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
          ),
        ],
      ),
    );
  }
}
