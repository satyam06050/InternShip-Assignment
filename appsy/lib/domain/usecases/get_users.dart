import '../entities/user_profile.dart';
import '../repositories/user_repository.dart';

class GetUsers {
  final UserRepository repository;

  GetUsers(this.repository);

  Future<List<UserProfile>> call() async {
    return await repository.getUsers();
  }
}