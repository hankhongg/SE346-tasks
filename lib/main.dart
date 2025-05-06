import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nav Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => const FirstRoute(),
      },

      onGenerateRoute: (settings) {
      if (settings.name == '/second') {
        final args = settings.arguments as String;
        return MaterialPageRoute(
          builder: (context) {
            return SecondRoute(data: args);
          },
        );
      }
      assert(false, 'Need to implement ${settings.name}');
      return null;
    },
      
    );
  }
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Route'),
      ),
      body: Center(
        child: ElevatedButton(
          child: const Text('Navigate to the next route'),
          onPressed: () {
            // Navigate to the second route when tapped.
            // Navigator.push(
            //   context,
            //   MaterialPageRoute(builder: (context) => const SecondRoute()),
            // );
            Navigator.pushNamed(context, '/second', arguments: 'Hello from the first route!');
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  final String? data;
  const SecondRoute({this.data, super.key});
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Route'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(data ?? 'No data received'),
            const SizedBox(height: 20),
            ElevatedButton(
              child: const Text('Go back!'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      
    );
   
  }
}