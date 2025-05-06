import "package:flutter/material.dart";

class ReminderRow extends StatelessWidget {
  final String index;
  final String title;
  final String dateTime;

  const ReminderRow({
    super.key,
    required this.title,
    required this.dateTime,
    required this.index,
  });

  @override
  Widget build(BuildContext context) {
   return ListTile(
      leading: CircleAvatar(
        radius: 20, 
        backgroundColor: Colors.deepPurpleAccent,
        child: Text(
          "#$index",
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
      title: Text(title),
      subtitle: Text(dateTime),
    );

  }
}