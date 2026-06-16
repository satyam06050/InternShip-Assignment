import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'data/repositories/user_repository_impl.dart';
import 'domain/usecases/get_users.dart';
import 'presentation/providers/user_provider.dart';
import 'presentation/providers/responsive_provider.dart';
import 'presentation/screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => UserProvider(
            GetUsers(UserRepositoryImpl()),
          ),
        ),
        ChangeNotifierProvider(
          create: (context) => ResponsiveProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'Profile Explorer',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          useMaterial3: true,
        ),
        home: const HomeScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}