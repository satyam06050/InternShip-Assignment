import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/event_model.dart';
import '../../providers/dashboard_providers.dart';

class EventDetailsScreen extends ConsumerWidget {
  const EventDetailsScreen({super.key, required this.eventId});

  final String eventId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashboardAsync = ref.watch(dashboardProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Event Details')),
      body: dashboardAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text('Failed to load: $error')),
        data: (dashboard) {
          final event = dashboard.events.firstWhere(
            (e) => e.id == eventId,
            orElse: () => dashboard.events.first,
          );
          return _EventDetailsBody(event: event);
        },
      ),
    );
  }
}

class _EventDetailsBody extends StatelessWidget {
  const _EventDetailsBody({required this.event});

  final EventModel event;

  String get _formattedDate {
    try {
      return DateFormat('d MMMM yyyy').format(DateTime.parse(event.date));
    } catch (_) {
      return event.date;
    }
  }

  @override
  Widget build(BuildContext context) {
    final currency =
        NumberFormat.currency(locale: 'en_IN', symbol: '₹', decimalDigits: 0);
    final total = event.collected + event.pending;
    final progress = total == 0 ? 0.0 : event.collected / total;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            event.name,
            style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary),
          ),
          const SizedBox(height: AppSpacing.xs),
          Row(
            children: [
              const Icon(Icons.calendar_month_outlined,
                  size: 16, color: AppColors.textSecondary),
              const SizedBox(width: 4),
              Text(_formattedDate,
                  style: const TextStyle(color: AppColors.textSecondary)),
              const SizedBox(width: AppSpacing.md),
              const Icon(Icons.groups_outlined,
                  size: 16, color: AppColors.textSecondary),
              const SizedBox(width: 4),
              Text('${event.vendorCount} Vendors',
                  style: const TextStyle(color: AppColors.textSecondary)),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(AppRadius.md),
              boxShadow: const [
                BoxShadow(
                    color: Color(0x0F000000),
                    blurRadius: 10,
                    offset: Offset(0, 3))
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _amountBlock('Collected', currency.format(event.collected),
                        AppColors.success),
                    _amountBlock('Pending', currency.format(event.pending),
                        AppColors.danger),
                  ],
                ),
                const SizedBox(height: AppSpacing.md),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 8,
                    backgroundColor: AppColors.dangerBg,
                    color: AppColors.success,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  '${(progress * 100).toStringAsFixed(0)}% collected',
                  style: const TextStyle(
                      fontSize: 12, color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _amountBlock(String label, String value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label,
            style:
                const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
        const SizedBox(height: 4),
        Text(value,
            style: TextStyle(
                fontSize: 18, fontWeight: FontWeight.w700, color: color)),
      ],
    );
  }
}
