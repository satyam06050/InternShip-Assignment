import 'package:flutter/material.dart';
import '../../domain/entities/user_profile.dart';
import '../../domain/usecases/get_users.dart';

enum LoadingState { idle, loading, loaded, error }

class UserProvider extends ChangeNotifier {
  final GetUsers getUsers;
  
  List<UserProfile> _users = [];
  List<UserProfile> _filteredUsers = [];
  LoadingState _state = LoadingState.idle;
  String _errorMessage = '';
  String? _selectedCountry;
  List<String> _countries = ['All'];

  List<UserProfile> get users => _users;
  List<UserProfile> get filteredUsers => _filteredUsers;
  LoadingState get state => _state;
  String get errorMessage => _errorMessage;
  String? get selectedCountry => _selectedCountry;
  List<String> get countries => _countries;

  UserProvider(this.getUsers);

  Future<void> fetchUsers() async {
    _state = LoadingState.loading;
    notifyListeners();

    try {
      _users = await getUsers();
      _updateCountries();
      _applyFilter();
      _state = LoadingState.loaded;
    } catch (e) {
      _state = LoadingState.error;
      _errorMessage = e.toString();
    }
    notifyListeners();
  }

  void _updateCountries() {
    final countrySet = _users.map((user) => user.city).toSet();
    _countries = ['All', ...countrySet.toList()]..sort();
  }

  void filterByCountry(String? country) {
    _selectedCountry = country;
    _applyFilter();
    notifyListeners();
  }

  void _applyFilter() {
    if (_selectedCountry == null || _selectedCountry == 'All') {
      _filteredUsers = List.from(_users);
    } else {
      _filteredUsers = _users.where((user) => user.city == _selectedCountry).toList();
    }
  }

  void toggleLike(String userId) {
    final userIndex = _users.indexWhere((user) => user.id == userId);
    if (userIndex != -1) {
      _users[userIndex].isLiked = !_users[userIndex].isLiked;
      notifyListeners();
    }
  }

  UserProfile? getUserById(String id) {
    try {
      return _users.firstWhere((user) => user.id == id);
    } catch (e) {
      return null;
    }
  }
}