import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../services/gemini_service.dart';
import '../../constants/colors.dart';

class TutorScreen extends StatefulWidget {
  const TutorScreen({super.key});

  @override
  State<TutorScreen> createState() => _TutorScreenState();
}

class _TutorScreenState extends State<TutorScreen> {
  final TextEditingController _messageController = TextEditingController();
  final GeminiService _geminiService = GeminiService();
  final List<ChatMessage> _messages = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _addWelcomeMessage();
  }

  void _addWelcomeMessage() {
    setState(() {
      _messages.add(
        ChatMessage(
          text:
              "Hi! I'm your AI tutor. I'm here to help you with your studies. Ask me anything about your courses, need study tips, or want explanations of difficult concepts!",
          isUser: false,
          timestamp: DateTime.now(),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.psychology,
                    color: Colors.white,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'AI Tutor',
                      style: GoogleFonts.poppins(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      'Your personal learning assistant',
                      style: GoogleFonts.poppins(
                        fontSize: 14,
                        color: Colors.white.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Chat Area
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.95),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(25),
                  topRight: Radius.circular(25),
                ),
              ),
              child: Column(
                children: [
                  // Messages
                  Expanded(
                    child: ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: _messages.length,
                      itemBuilder: (context, index) {
                        return _buildChatMessage(_messages[index]);
                      },
                    ),
                  ),

                  // Loading indicator
                  if (_isLoading)
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          CircularProgressIndicator(color: AppColors.emerald),
                          const SizedBox(width: 16),
                          Text(
                            'AI Tutor is thinking...',
                            style: GoogleFonts.poppins(
                              color: Colors.grey[600],
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ],
                      ),
                    ),

                  // Input Area
                  _buildInputArea(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatMessage(ChatMessage message) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!message.isUser) ...[
            CircleAvatar(
              radius: 16,
              backgroundColor: AppColors.emerald,
              child: const Icon(
                Icons.psychology,
                color: Colors.white,
                size: 16,
              ),
            ),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: message.isUser ? AppColors.emerald : Colors.grey[100],
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                message.text,
                style: GoogleFonts.poppins(
                  color: message.isUser ? Colors.white : Colors.black,
                  fontSize: 14,
                  height: 1.4,
                ),
              ),
            ),
          ),
          if (message.isUser) ...[
            const SizedBox(width: 12),
            CircleAvatar(
              radius: 16,
              backgroundColor: Colors.grey[300],
              child: const Icon(Icons.person, color: Colors.grey, size: 16),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Colors.grey[200]!)),
      ),
      child: Row(
        children: [
          // Quick action buttons
          PopupMenuButton<String>(
            icon: Icon(Icons.add_circle_outline, color: AppColors.emerald),
            onSelected: (value) async {
              await _handleQuickAction(value);
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'study_tips',
                child: Row(
                  children: [
                    Icon(Icons.lightbulb_outline, color: AppColors.emerald),
                    const SizedBox(width: 8),
                    const Text('Study Tips'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'explain_math',
                child: Row(
                  children: [
                    Icon(Icons.calculate_outlined, color: AppColors.emerald),
                    const SizedBox(width: 8),
                    const Text('Explain Math Concept'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'help_science',
                child: Row(
                  children: [
                    Icon(Icons.science_outlined, color: AppColors.emerald),
                    const SizedBox(width: 8),
                    const Text('Science Help'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),

          // Text Input
          Expanded(
            child: TextField(
              controller: _messageController,
              decoration: InputDecoration(
                hintText: 'Ask me anything...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                  borderSide: BorderSide(color: Colors.grey[300]!),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
              maxLines: null,
              onSubmitted: (value) => _sendMessage(),
            ),
          ),
          const SizedBox(width: 8),

          // Send Button
          CircleAvatar(
            backgroundColor: AppColors.emerald,
            child: IconButton(
              icon: const Icon(Icons.send, color: Colors.white),
              onPressed: _sendMessage,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage() async {
    if (_messageController.text.trim().isEmpty || _isLoading) return;

    final message = _messageController.text.trim();
    _messageController.clear();

    setState(() {
      _messages.add(
        ChatMessage(text: message, isUser: true, timestamp: DateTime.now()),
      );
      _isLoading = true;
    });

    try {
      final response = await _geminiService.generateResponse(message);
      setState(() {
        _messages.add(
          ChatMessage(text: response, isUser: false, timestamp: DateTime.now()),
        );
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _messages.add(
          ChatMessage(
            text: "Sorry, I encountered an error. Please try again.",
            isUser: false,
            timestamp: DateTime.now(),
          ),
        );
        _isLoading = false;
      });
    }
  }

  Future<void> _handleQuickAction(String action) async {
    setState(() {
      _isLoading = true;
    });

    String response;
    String userMessage;

    switch (action) {
      case 'study_tips':
        userMessage = 'Can you give me some general study tips?';
        response = await _geminiService.getStudyTips('general subjects');
        break;
      case 'explain_math':
        userMessage = 'Can you help explain a math concept?';
        response =
            'I\'d be happy to help explain math concepts! What specific math topic would you like me to explain? For example: algebra, geometry, calculus, statistics, or any specific problem you\'re working on.';
        break;
      case 'help_science':
        userMessage = 'I need help with science subjects';
        response =
            'I\'m here to help with all science subjects! Whether it\'s physics, chemistry, biology, or earth science, I can explain concepts, help with experiments, or clarify difficult topics. What specific science topic would you like to explore?';
        break;
      default:
        userMessage = action;
        response = await _geminiService.generateResponse(action);
    }

    setState(() {
      _messages.add(
        ChatMessage(text: userMessage, isUser: true, timestamp: DateTime.now()),
      );
      _messages.add(
        ChatMessage(text: response, isUser: false, timestamp: DateTime.now()),
      );
      _isLoading = false;
    });
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }
}

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
  });
}
