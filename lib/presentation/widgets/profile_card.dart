import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../domain/entities/user_profile.dart';
import '../providers/responsive_provider.dart';

class ProfileCard extends StatefulWidget {
  final UserProfile profile;
  final VoidCallback? onTap;
  final VoidCallback? onLike;

  const ProfileCard({
    Key? key,
    required this.profile,
    this.onTap,
    this.onLike,
  }) : super(key: key);

  @override
  State<ProfileCard> createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard>
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
    widget.onLike?.call();
  }

  @override
  Widget build(BuildContext context) {
    final responsive = context.watch<ResponsiveProvider>();
    
    return GestureDetector(
      onTap: widget.onTap,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Hero(
                tag: 'profile-${widget.profile.id}',
                child: CachedNetworkImage(
                  imageUrl: widget.profile.pictureUrl,
                  fit: BoxFit.cover,
                  placeholder: (context, url) => Container(
                    color: Colors.grey[300],
                    child: const Center(
                      child: CircularProgressIndicator(),
                    ),
                  ),
                  errorWidget: (context, url, error) => Container(
                    color: Colors.grey[300],
                    child: const Icon(Icons.person, size: 50),
                  ),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withOpacity(0.7),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 12,
                left: 12,
                right: 12,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Flexible(
                          child: Text(
                            '${widget.profile.firstName}, ${widget.profile.age}',
                            style: GoogleFonts.montserrat(
                              color: Colors.white,
                              fontSize: responsive.cardNameSize,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: _onLikeTap,
                          child: AnimatedBuilder(
                            animation: _scaleAnimation,
                            builder: (context, child) {
                              return Transform.scale(
                                scale: _scaleAnimation.value,
                                child: Icon(
                                  widget.profile.isLiked ? Icons.favorite : Icons.favorite_border,
                                  color: widget.profile.isLiked ? Colors.red : Colors.white,
                                  size: 20,
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                    Text(
                      widget.profile.city,
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: responsive.cardCitySize,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}