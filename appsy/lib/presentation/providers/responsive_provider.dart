import 'package:flutter/material.dart';

class ResponsiveProvider extends ChangeNotifier {
  late Size _screenSize;
  late double _width;
  late double _height;

  void updateScreenSize(Size size) {
    _screenSize = size;
    _width = size.width;
    _height = size.height;
    notifyListeners();
  }

  double get width => _width;
  double get height => _height;
  
  // Grid properties
  int get crossAxisCount => _width > 600 ? 3 : 2;
  double get cardAspectRatio => 0.85;
  
  // Spacing
  double get padding => _width * 0.04;
  double get spacing => _width * 0.03;
  
  // Font sizes
  double get cardNameSize => _width * 0.045;
  double get cardCitySize => _width * 0.035;
  double get profileNameSize => _width * 0.055;
  double get locationLabelSize => _width * 0.032;
  double get locationSize => _width * 0.04;
  
  // Icon sizes
  double get iconSize => _width * 0.06;
  double get iconPadding => _width * 0.02;
  
  // Profile detail margins
  double get profileMargin => _width * 0.05;
  double get profileBottomMargin => _height * 0.05;
  double get profilePadding => _width * 0.06;
  double get profileSpacing => _height * 0.015;
  double get profileSmallSpacing => _height * 0.008;
}