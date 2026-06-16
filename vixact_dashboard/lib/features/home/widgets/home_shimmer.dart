import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../../../core/theme/app_theme.dart';

class HomeShimmer extends StatelessWidget {
  const HomeShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: const Color(0xFFE8E9EE),
      highlightColor: const Color(0xFFF5F6F9),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _block(width: 140, height: 14),
            const SizedBox(height: AppSpacing.sm),
            _block(width: 180, height: 26),
            const SizedBox(height: AppSpacing.lg),
            Row(
              children: List.generate(
                3,
                (i) => Padding(
                  padding: const EdgeInsets.only(right: AppSpacing.sm),
                  child: _block(width: 220, height: 150, radius: AppRadius.lg),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            Row(
              children: List.generate(
                3,
                (i) => Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(right: AppSpacing.sm),
                    child: _block(height: 100, radius: AppRadius.md),
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            _block(width: 160, height: 16),
            const SizedBox(height: AppSpacing.sm),
            ...List.generate(
              4,
              (i) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                child: _block(height: 64, radius: AppRadius.md),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _block({double? width, required double height, double radius = 8}) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(radius),
      ),
    );
  }
}
