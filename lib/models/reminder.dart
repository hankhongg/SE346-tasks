// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class ReminderModel {
  String? id;
  String? title;
  DateTime? dateTime;
  ReminderModel({
    this.id,
    this.title,
    this.dateTime,
  });


  ReminderModel copyWith({
    String? id,
    String? title,
    DateTime? dateTime,
  }) {
    return ReminderModel(
      id: id ?? this.id,
      title: title ?? this.title,
      dateTime: dateTime ?? this.dateTime,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'title': title,
      'dateTime': dateTime?.millisecondsSinceEpoch,
    };
  }

  factory ReminderModel.fromMap(Map<String, dynamic> map) {
    return ReminderModel(
      id: map['id'] != null ? map['id'] as String : null,
      title: map['title'] != null ? map['title'] as String : null,
      dateTime: map['dateTime'] != null ? DateTime.fromMillisecondsSinceEpoch(map['dateTime'] as int) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory ReminderModel.fromJson(String source) => ReminderModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'ReminderModel(id: $id, title: $title, dateTime: $dateTime)';

  @override
  bool operator ==(covariant ReminderModel other) {
    if (identical(this, other)) return true;
  
    return 
      other.id == id &&
      other.title == title &&
      other.dateTime == dateTime;
  }

  @override
  int get hashCode => id.hashCode ^ title.hashCode ^ dateTime.hashCode;
}
