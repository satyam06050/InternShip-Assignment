import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vixact_dashboard/main.dart';

void main() {
  testWidgets('App boots and shows loading then dashboard content',
      (WidgetTester tester) async {
    await tester.pumpWidget(const ProviderScope(child: VixactApp()));

    // Initial frame: shimmer/loading state should render without error.
    await tester.pump();
    expect(find.byType(MaterialApp), findsOneWidget);

    // Allow async dashboard fetch (mock fallback) to resolve.
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.textContaining('Welcome Back'), findsOneWidget);
    expect(find.text('Sai Teja'), findsOneWidget);
  });
}
