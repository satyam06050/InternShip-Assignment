class UserProfile {
  final String firstName;
  final String pictureUrl;
  final int age;
  final String city;
  final String id;
  bool isLiked;

  UserProfile({
    required this.firstName,
    required this.pictureUrl,
    required this.age,
    required this.city,
    required this.id,
    this.isLiked = false,
  });
}