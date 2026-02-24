import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    try {
      router.replace("/");
    } catch {
      // If router isn't ready, just reset the error state
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          className="flex-1 bg-white items-center justify-center px-6"
          accessibilityRole="alert"
        >
          <View className="w-20 h-20 bg-gold/10 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl text-gold">!</Text>
          </View>
          <Text
            className="font-heading-bold text-2xl text-gray-charcoal text-center mb-3"
            accessibilityRole="header"
          >
            Something Went Wrong
          </Text>
          <Text className="font-body text-base text-gray-charcoal/70 text-center mb-8 max-w-md">
            We apologize for the inconvenience. Please try returning to the home
            page.
          </Text>
          <Pressable
            onPress={this.handleReset}
            accessibilityRole="button"
            accessibilityLabel="Return to Home"
            className="bg-green-deep px-8 py-4 rounded-lg min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <Text className="font-body-semibold text-base text-white">
              Return to Home
            </Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
