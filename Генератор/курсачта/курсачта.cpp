#include <iostream>
#include <string>
#include <vector>
#include <cmath>

int binaryToDecimal(const std::string& binaryNumber) {
    int decimalNumber = 0;
    int power = 0;

    for (int i = binaryNumber.length() - 1; i >= 0; --i) {
        int digit = binaryNumber[i] - '0';
        decimalNumber += digit * pow(2, power);
        power++;
    }

    return decimalNumber;
}

void generateBinaryCombinations(const std::string& partialString, std::vector<std::string>& combinations, std::string& currentCombination, int index) {
    if (index == partialString.length()) {
        combinations.push_back(currentCombination);
    }
    else {
        if (partialString[index] == '-') {
            currentCombination[index] = '0';
            generateBinaryCombinations(partialString, combinations, currentCombination, index + 1);
            currentCombination[index] = '1';
            generateBinaryCombinations(partialString, combinations, currentCombination, index + 1);
        }
        else {
            currentCombination[index] = partialString[index];
            generateBinaryCombinations(partialString, combinations, currentCombination, index + 1);
        }
    }
}

int main() {
    int c = 0;
    std::string inputString;
    std::cout << "Enter a string consisting of 14 characters (0, 1, or -): ";
    std::cin >> inputString;

    // Проверка длины строки
    if (inputString.length() != 14) {
        std::cout << "Error: the string must consist of 14 characters.\n";
        return 1;
    }

    // Проверка допустимых символов
    for (char c : inputString) {
        if (c != '0' && c != '1' && c != '-') {
            std::cout << "Error: The string should consist only of the characters '0', '1', and '-'.\n";
            return 1;
        }
    }

    std::string firstPart = inputString.substr(0, 4);
    std::string secondPart = inputString.substr(4, 10);

    std::vector<std::string> combinations;
    std::string currentCombination(secondPart.length(), '0');
    generateBinaryCombinations(secondPart, combinations, currentCombination, 0);

    std::string decimalNumbers;  // Строка для хранения готовых десятичных чисел

    for (const auto& combination : combinations) {
        std::string fullString = firstPart;
        for (int i = 0; i < combination.length(); ++i) {
            if (combination[i] == '0' || combination[i] == '1')
                fullString += combination[i];
            else
                fullString += '-';
        }
        int decimalNumber = binaryToDecimal(fullString);
        decimalNumbers += std::to_string(decimalNumber) + ", ";
        c++;
    }

    std::cout << "Ready-made decimal numbers: " << decimalNumbers << std::endl;
    std::cout << c;

    return 0;
}