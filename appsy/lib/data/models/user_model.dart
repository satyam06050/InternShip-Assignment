import '../../domain/entities/user_profile.dart';

class UserModel extends UserProfile {
  UserModel({
    required super.firstName,
    required super.pictureUrl,
    required super.age,
    required super.city,
    required super.id,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      firstName: json['name']['first'],
      pictureUrl: json['picture']['large'],
      age: json['dob']['age'],
      city: json['location']['city'],
      id: json['login']['uuid'],
    );
  }
}