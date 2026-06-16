import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/router/app_router.dart';
import '../../core/theme/app_theme.dart';
import '../../providers/dashboard_providers.dart';
import 'widgets/activity_tile.dart';
import 'widgets/error_state.dart';
import 'widgets/event_card.dart';
import 'widgets/home_bottom_nav.dart';
import 'widgets/home_header.dart';
import 'widgets/home_shimmer.dart';
import 'widgets/quick_action_tile.dart';
import 'widgets/summary_tile.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _navIndex = 0;

  @override
  Widget build(BuildContext context) {
    final dashboardAsync = ref.watch(dashboardProvider);

    return Scaffold(
      body: SafeArea(
        child: dashboardAsync.when(
          loading: () => const HomeShimmer(),
          error: (error, _) => ErrorState(
            message: error.toString(),
            onRetry: () => ref.read(dashboardProvider.notifier).refresh(),
          ),
          data: (dashboard) => RefreshIndicator(
            onRefresh: () => ref.read(dashboardProvider.notifier).refresh(),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  HomeHeader(
                    userName: dashboard.user.name,
                    unreadCount: dashboard.user.unreadNotifications,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  const _SectionHeader(
                    title: 'ACTIVE EVENTS',
                    actionLabel: 'View All',
                    onAction: null,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  SizedBox(
                    height: 210,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: dashboard.events.length,
                      separatorBuilder: (_, __) =>
                          const SizedBox(width: AppSpacing.sm),
                      itemBuilder: (context, index) {
                        final event = dashboard.events[index];
                        return EventCard(
                          event: event,
                          onTap: () => context.push(
                            '${AppRoutes.eventDetails}?eventId=${event.id}',
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Row(
                    children: [
                      Expanded(
                        child: SummaryTile(
                          icon: Icons.groups_outlined,
                          iconBg: AppColors.infoBg,
                          iconColor: AppColors.primary,
                          label: 'Total Vendors',
                          value: dashboard.summary.totalVendors,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: SummaryTile(
                          icon: Icons.trending_up,
                          iconBg: AppColors.successBg,
                          iconColor: AppColors.success,
                          label: 'Collected',
                          value: dashboard.summary.totalCollected,
                          valueColor: AppColors.success,
                          isCurrency: true,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: SummaryTile(
                          icon: Icons.trending_down,
                          iconBg: AppColors.dangerBg,
                          iconColor: AppColors.danger,
                          label: 'Outstanding',
                          value: dashboard.summary.totalOutstanding,
                          valueColor: AppColors.danger,
                          isCurrency: true,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  const _SectionHeader(title: 'QUICK ACTIONS'),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      Expanded(
                        child: QuickActionTile(
                          icon: Icons.person_add_alt_1,
                          iconColor: AppColors.primary,
                          label: 'Add Vendor',
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: QuickActionTile(
                          icon: Icons.account_balance_wallet_outlined,
                          iconColor: AppColors.primary,
                          label: 'Record Payment',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      Expanded(
                        child: QuickActionTile(
                          icon: Icons.bar_chart_outlined,
                          iconColor: AppColors.primary,
                          label: 'Reports',
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: QuickActionTile(
                          icon: Icons.grid_view_outlined,
                          iconColor: AppColors.primary,
                          label: 'Categories',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  const _SectionHeader(title: 'RECENT ACTIVITY'),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.md),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      boxShadow: const [
                        BoxShadow(
                          color: Color(0x0F000000),
                          blurRadius: 10,
                          offset: Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        for (final activity in dashboard.recentActivity)
                          ActivityTile(activity: activity),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                ],
              ),
            ),
          ),
        ),
      ),
      bottomNavigationBar: HomeBottomNav(
        currentIndex: _navIndex,
        onTap: (index) => setState(() => _navIndex = index),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({
    required this.title,
    this.actionLabel,
    this.onAction,
  });

  final String title;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: AppColors.textSecondary,
            letterSpacing: 0.5,
          ),
        ),
        if (actionLabel != null)
          GestureDetector(
            onTap: onAction,
            child: Row(
              children: [
                Text(
                  actionLabel!,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.primary,
                  ),
                ),
                const Icon(Icons.chevron_right,
                    size: 16, color: AppColors.primary),
              ],
            ),
          ),
      ],
    );
  }
}
