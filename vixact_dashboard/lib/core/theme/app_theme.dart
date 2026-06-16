import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Centralized design tokens. Keeping these in one place avoids
/// magic hex values scattered across widgets.
class AppColors {
  AppColors._();

  static const primary = Color(0xFF3B6FF0);
  static const primaryDark = Color(0xFF2B4FE0);
  static const accentPurple = Color(0xFF7B6BF5);
  static const accentOrange = Color(0xFFF5A35C);

  static const background = Color(0xFFF6F7FB);
  static const surface = Color(0xFFFFFFFF);

  static const textPrimary = Color(0xFF1A1D29);
  static const textSecondary = Color(0xFF8A8D98);

  static const success = Color(0xFF1FA060);
  static const danger = Color(0xFFE0524A);
  static const warning = Color(0xFFF5A35C);

  static const successBg = Color(0xFFE6F6ED);
  static const dangerBg = Color(0xFFFCEAEA);
  static const infoBg = Color(0xFFEAF0FF);

  static const divider = Color(0xFFEDEEF2);
}

class AppSpacing {
  AppSpacing._();
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 16.0;
  static const lg = 24.0;
  static const xl = 32.0;
}

class AppRadius {
  AppRadius._();
  static const sm = 10.0;
  static const md = 16.0;
  static const lg = 20.0;
}

class AppTheme {
  AppTheme._();

  static ThemeData get light {
    final base = ThemeData.light(useMaterial3: true);
    final textTheme = GoogleFonts.interTextTheme(base.textTheme);

    return base.copyWith(
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: base.colorScheme.copyWith(
        primary: AppColors.primary,
        surface: AppColors.surface,
      ),
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.background,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        foregroundColor: AppColors.textPrimary,
      ),
      cardTheme: CardThemeData(
        color: AppColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
        ),
      ),
      dividerTheme: const DividerThemeData(color: AppColors.divider),
    );
  }
}
