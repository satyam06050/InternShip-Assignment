import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/user_provider.dart';
import '../providers/responsive_provider.dart';
import '../widgets/profile_card.dart';
import 'profile_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().fetchUsers();
    });
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ResponsiveProvider>().updateScreenSize(MediaQuery.of(context).size);
    });
    
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Consumer2<UserProvider, ResponsiveProvider>(
          builder: (context, userProvider, responsive, child) {
            switch (userProvider.state) {
              case LoadingState.loading:
                return const Center(child: CircularProgressIndicator());
              
              case LoadingState.error:
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error, size: 64, color: Colors.red),
                      const SizedBox(height: 16),
                      Text('Error: ${userProvider.errorMessage}'),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => userProvider.fetchUsers(),
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                );
              
              case LoadingState.loaded:
                return Stack(
                  children: [
                    // Grid with Pull-to-Refresh
                    RefreshIndicator(
                      onRefresh: () => userProvider.fetchUsers(),
                      child: Padding(
                        padding: EdgeInsets.all(responsive.padding),
                        child: GridView.builder(
                          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: responsive.crossAxisCount,
                            childAspectRatio: responsive.cardAspectRatio,
                            crossAxisSpacing: responsive.spacing,
                            mainAxisSpacing: responsive.spacing,
                          ),
                          itemCount: userProvider.filteredUsers.length,
                          itemBuilder: (context, index) {
                            final user = userProvider.filteredUsers[index];
                            return ProfileCard(
                              profile: user,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => ProfileDetailScreen(user: user),
                                  ),
                                );
                              },
                              onLike: () => userProvider.toggleLike(user.id),
                            );
                          },
                        ),
                      ),
                    ),
                    // Country Filter - Top Right
                    Positioned(
                      top: 8,
                      right: 16,
                      child: Container(
                        width: 120,
                        height: 40,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 4,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: userProvider.selectedCountry,
                            hint: const Padding(
                              padding: EdgeInsets.only(left: 12),
                              child: Text(
                                'Filter',
                                style: TextStyle(fontSize: 12, color: Colors.grey),
                              ),
                            ),
                            icon: const Padding(
                              padding: EdgeInsets.only(right: 8),
                              child: Icon(Icons.filter_list, size: 16),
                            ),
                            isExpanded: true,
                            items: userProvider.countries.map((country) {
                              return DropdownMenuItem(
                                value: country,
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 12),
                                  child: Text(
                                    country,
                                    style: const TextStyle(fontSize: 12),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              );
                            }).toList(),
                            onChanged: (value) => userProvider.filterByCountry(value),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              
              default:
                return const Center(child: Text('Welcome to Profile Explorer'));
            }
          },
        ),
      ),
    );
  }
}