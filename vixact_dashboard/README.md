# VIXACT Dashboard — Flutter Internship Technical Assessment

A pixel-matched recreation of the VIXACT dashboard UI, built with Riverpod,
Dio, and Go Router following a clean, layered architecture.

## Stack

| Layer | Choice |
|---|---|
| Framework | Flutter (Dart 3.3+) |
| State management | Riverpod (`flutter_riverpod` + code generation) |
| Networking | Dio |
| Navigation | Go Router |
| Models | Freezed + json_serializable |
| Loading UI | Shimmer |

## Project Structure

```
lib/
  core/
    network/        DioClient singleton — base URL, timeouts, interceptors
    router/         GoRouter route table (AppRoutes, appRouter)
    theme/          AppColors / AppSpacing / AppRadius / AppTheme tokens
  data/
    models/         Freezed + json_serializable models (Event, Activity, Summary, DashboardResponse)
    datasources/    DashboardRemoteDataSource — real Dio call + mock JSON fallback
    repositories/   DashboardRepository — abstracts the datasource from providers
  providers/        Riverpod generated providers (DI wiring + AsyncNotifier)
  features/
    home/
      home_screen.dart
      widgets/      HomeHeader, EventCard, SummaryTile, QuickActionTile,
                     ActivityTile, HomeShimmer, ErrorState, HomeBottomNav
    event_details/
      event_details_screen.dart
  main.dart          ProviderScope + MaterialApp.router

assets/mock/dashboard.json   Mock API payload
test/widget_test.dart        Smoke test
```

**Data flow:** `UI → Riverpod provider → Repository → DataSource → Dio`.
Each layer only depends on the one directly below it, so the data source
(and therefore the API itself) can be swapped without touching any UI code.

## Why Dio hits a mock fallback

Per the assignment FAQ, a live backend isn't required. Rather than skip
Dio, `DashboardRemoteDataSource` performs a genuine `dio.get('/dashboard')`
against a placeholder base URL first, and on `DioException` falls back to
the bundled `assets/mock/dashboard.json`. This keeps the Dio integration
real and testable — pointing `DioClient.baseUrl` at the Spring Boot
service later requires no other code changes.

## State management

`Dashboard` (generated `@riverpod` `AsyncNotifier`) exposes
`AsyncValue<DashboardResponse>`. The UI switches on `.when(loading, error,
data)` — no manual booleans, no `setState()` for data state. Pull-to-refresh
calls `notifier.refresh()`, which invalidates and re-awaits the provider.

## Navigation

Go Router with two routes:

- `/` — Home (dashboard)
- `/event-details?eventId=<id>` — Event Details

Tapping an event card pushes the details route with the event's id as a
query parameter; the details screen reads it via `state.uri.queryParameters`.

## Setup

```bash
git clone <this-repo-url>
cd vixact_dashboard
flutter pub get
dart run build_runner build --delete-conflicting-outputs
flutter run
```

Re-run `build_runner` any time a `@freezed` model or `@riverpod` provider
changes — both rely on generated `.freezed.dart` / `.g.dart` files.

## Build the APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

## Run tests

```bash
flutter test
```

## Requirements checklist

- [x] Riverpod state management (code-generated `AsyncNotifier`)
- [x] Dio API integration (with documented mock fallback)
- [x] Go Router navigation (Home → Event Details)
- [x] Event Details screen
- [x] Clean folder architecture (core / data / providers / features)
- [x] Reusable widgets (no single-file screen dump)
- [x] Loading state (shimmer) and error state (retry)
- [x] Responsive layout (Expanded/Flexible, no hardcoded widths beyond cards)
- [x] Proper typed models (Freezed)
- [x] No `setState()` used for data/business state (only local UI state like bottom-nav index)

## Bonus items implemented

- Freezed models
- Riverpod code generation (`@riverpod`)
- Shimmer loading states

## Bonus items not implemented (by scope choice)

- Theme management (light/dark toggle) — single light theme only
- Unit tests beyond one smoke test
- GitHub Actions CI/CD

## Notes on AI tool usage

Implementation was AI-assisted (per FAQ Q3, this is permitted). All
architectural choices — layering, provider design, mock-fallback strategy —
are understood and can be explained/defended during review.
