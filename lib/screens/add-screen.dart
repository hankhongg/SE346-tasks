import "package:flutter/material.dart";

class AddScreen extends StatefulWidget {
  const AddScreen({super.key});

  @override
  State<AddScreen> createState() => _AddScreenState();
}

class _AddScreenState extends State<AddScreen> {
  final formKey = GlobalKey<FormState>();
  final TextEditingController titleTextEdittingController = TextEditingController();
  final TextEditingController dateTimeTextEdittingController = TextEditingController();

  DateTime? selectedDateTime = DateTime.now();

  void pickDateTime() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDateTime!,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDateTime) {
      setState(() {
        selectedDateTime = picked;
        dateTimeTextEdittingController.text = "${picked.toLocal()}".split(' ')[0];
      });
    }
  } 

  void addReminder() {
    if (formKey.currentState!.validate()) {
      final reminder = {
        'title': titleTextEdittingController.text,
        'dateTime': selectedDateTime,
      };

      Navigator.pop(context, reminder);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Reminder'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: addReminder,
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Form(
              key: formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  TextFormField(
                    controller: titleTextEdittingController,
                    decoration: const InputDecoration(labelText: 'Title'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a title';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: dateTimeTextEdittingController,
                    decoration: const InputDecoration(labelText: 'Date and Time'),
                    onTap: pickDateTime,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a date and time';
                      }
                      return null;
                    },
                  ),
                ],
              ),
            ),
          ),
          Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FilledButton(onPressed: addReminder, 
                    style: ButtonStyle(
                      textStyle: WidgetStateProperty.all(const TextStyle(fontSize: 16)),
                      shape: WidgetStateProperty.all(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12), 
                      ),
                      
                    ),
                    ),
                    child: Text("Add Reminder"),
                  
                  
                  ),
                )
        ],
      ),
    );
  }
}