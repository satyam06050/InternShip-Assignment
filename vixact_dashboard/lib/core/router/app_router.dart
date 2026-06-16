import 'package:go_router/go_router.dart';
import '../../features/home/home_screen.dart';
import '../../features/event_details/event_details_screen.dart';

class AppRoutes {
  AppRoutes._();
  static const home = '/';
  static const eventDetails = '/event-details';
}

final appRouter = GoRouter(
  initialLocation: AppRoutes.home,
  routes: [
    GoRoute(
      path: AppRoutes.home,
      name: 'home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: AppRoutes.eventDetails,
      name: 'eventDetails',
      builder: (context, state) {
        final eventId = state.uri.queryParameters['eventId'] ?? '';
        return EventDetailsScreen(eventId: eventId);
      },
    ),
  ],
);
