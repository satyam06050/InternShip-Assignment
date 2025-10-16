import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../../domain/entities/user_profile.dart';
import '../../domain/repositories/user_repository.dart';
import '../models/user_model.dart';

class UserRepositoryImpl implements UserRepository {
  final String baseUrl = 'https://randomuser.me/api/?results=20';

  @override
  Future<List<UserProfile>> getUsers() async {
    try {
      final response = await http.get(
        Uri.parse(baseUrl),
        headers: {'Content-Type': 'application/json'},
      ).timeout(const Duration(seconds: 10));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final List<dynamic> results = data['results'];
        
        return results.map((json) => UserModel.fromJson(json)).toList();
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } on SocketException {
      throw Exception('No internet connection');
    } on HttpException {
      throw Exception('HTTP error occurred');
    } on FormatException {
      throw Exception('Invalid response format');
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}