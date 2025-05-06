import "package:flutter/material.dart";
import "package:routing_screens/components/reminder-row.dart";
import "package:routing_screens/models/reminder.dart";

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
    final List<ReminderModel> reminders = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () async {
              final result = await Navigator.pushNamed(context, '/new-screen');
              if (result != null && result is Map<String, dynamic>) {
                setState(() {
                  reminders.add(ReminderModel(
                    title: result['title']!,
                    dateTime: result['dateTime'],
                  ));
                });
              }
            },
          ),
        ],
      ),
      body: reminders.isEmpty
    ? const Center(child: Text("No reminders yet"))
    : ListView.builder(
        itemCount: reminders.length,
        itemBuilder: (context, index) {
          final reminder = reminders[index];
          return ReminderRow(
            index: (index + 1).toString(),
            title: reminder.title!,
            dateTime: formatDateTime(reminder.dateTime!),
          );
        },
      ),
    );
  }
}

String formatDateTime(DateTime dt) {
  return "${dt.year}-${dt.month.toString().padLeft(2, '0')}-${dt.day.toString().padLeft(2, '0')} "
         ;
}