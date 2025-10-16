import '../entities/user_profile.dart';

abstract class UserRepository {
  Future<List<UserProfile>> getUsers();
}