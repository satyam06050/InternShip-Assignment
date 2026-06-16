import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';
import '../../domain/entities/user_profile.dart';
import '../providers/responsive_provider.dart';
import '../providers/user_provider.dart';

class ProfileDetailScreen extends StatefulWidget {
  final UserProfile user;

  const ProfileDetailScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<ProfileDetailScreen> createState() => _ProfileDetailScreenState();
}

class _ProfileDetailScreenState extends State<ProfileDetailScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.3).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.elasticOut),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _onLikeTap() {
    _animationController.forward().then((_) {
      _animationController.reverse();
    });
    context.read<UserProvider>().toggleLike(widget.user.id);
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ResponsiveProvider>().updateScreenSize(
        MediaQuery.of(context).size,
      );
    });
    final responsive = context.watch<ResponsiveProvider>();

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Background image
          Positioned.fill(
            child: Hero(
              tag: 'profile-${widget.user.id}',
              child: CachedNetworkImage(
                imageUrl: widget.user.pictureUrl,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  color: Colors.grey[800],
                  child: const Center(
                    child: CircularProgressIndicator(color: Colors.white),
                  ),
                ),
                errorWidget: (context, url, error) => Container(
                  color: Colors.grey[800],
                  child: const Icon(Icons.person, size: 100, color: Colors.white),
                ),
              ),
            ),
          ),
          // Gradient overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withOpacity(0.3),
                  Colors.transparent,
                  Colors.black.withOpacity(0.8),
                ],
              ),
            ),
          ),
          // Top navigation
          SafeArea(
            child: Padding(
              padding: EdgeInsets.all(responsive.padding),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: Container(
                      padding: EdgeInsets.all(responsive.iconPadding),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.3),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                        size: responsive.iconSize,
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      padding: EdgeInsets.all(responsive.iconPadding),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.3),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.more_vert,
                        color: Colors.white,
                        size: responsive.iconSize,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Bottom info card
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              margin: EdgeInsets.fromLTRB(
                responsive.profileMargin,
                0,
                responsive.profileMargin,
                responsive.profileBottomMargin,
              ),
              padding: EdgeInsets.all(responsive.profilePadding),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 20,
                    offset: const Offset(0, -5),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Flexible(
                        child: Text(
                          '${widget.user.firstName}, ${widget.user.age}',
                          style: TextStyle(
                            fontSize: responsive.profileNameSize,
                            fontWeight: FontWeight.w600,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      GestureDetector(
                        onTap: _onLikeTap,
                        child: Container(
                          padding: EdgeInsets.all(responsive.iconPadding),
                          child: AnimatedBuilder(
                            animation: _scaleAnimation,
                            builder: (context, child) {
                              return Transform.scale(
                                scale: _scaleAnimation.value,
                                child: Icon(
                                  widget.user.isLiked ? Icons.favorite : Icons.favorite_border,
                                  color: widget.user.isLiked ? Colors.red : Colors.grey[400],
                                  size: responsive.iconSize,
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: responsive.profileSpacing),
                  Text(
                    'Location',
                    style: TextStyle(
                      fontSize: responsive.locationLabelSize,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                    ),
                  ),
                  SizedBox(height: responsive.profileSmallSpacing),
                  Text(
                    widget.user.city,
                    style: TextStyle(
                      fontSize: responsive.locationSize,
                      color: Colors.grey[600],
                      //fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
