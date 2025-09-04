import 'package:google_generative_ai/google_generative_ai.dart';

class GeminiService {
  late final GenerativeModel _model;

  GeminiService() {
    // Initialize with your API key - you'll need to add this to your environment
    _model = GenerativeModel(
      model: 'gemini-pro',
      apiKey: 'YOUR_GEMINI_API_KEY', // Replace with actual API key
    );
  }

  Future<String> generateResponse(String message, {String? context}) async {
    try {
      final prompt = context != null
          ? 'Context: $context\n\nStudent Question: $message\n\nAs an educational tutor, please provide a helpful and encouraging response:'
          : 'As an educational tutor, please help answer this student question: $message';

      final response = await _model.generateContent([Content.text(prompt)]);
      return response.text ??
          'Sorry, I couldn\'t generate a response. Please try again.';
    } catch (e) {
      print('Error generating response: $e');
      return 'I\'m experiencing some technical difficulties. Please try again in a moment.';
    }
  }

  Future<String> getStudyTips(String subject) async {
    try {
      final prompt =
          'Provide 5 study tips for students learning $subject. Make the tips practical and encouraging.';
      final response = await _model.generateContent([Content.text(prompt)]);
      return response.text ?? 'Keep practicing and stay curious!';
    } catch (e) {
      print('Error generating study tips: $e');
      return 'Study regularly, practice frequently, and don\'t hesitate to ask questions!';
    }
  }

  Future<String> explainConcept(String concept, String subject) async {
    try {
      final prompt =
          'Explain the concept of "$concept" in $subject in simple terms that a student can understand. Use examples if helpful.';
      final response = await _model.generateContent([Content.text(prompt)]);
      return response.text ??
          'This is an important concept in $subject. Let me help you understand it better.';
    } catch (e) {
      print('Error explaining concept: $e');
      return 'I\'d be happy to explain this concept. Please try asking again or break it down into smaller parts.';
    }
  }
}
