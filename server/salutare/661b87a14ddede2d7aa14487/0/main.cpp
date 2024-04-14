#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        // Check if target is present at mid
        if (arr[mid] == target)
            return mid;

        // If target is greater, ignore left half
        if (arr[mid] < target)
            left = mid + 1;

        // If target is smaller, ignore right half
        else
            right = mid - 1;
    }

    // Target not found in array
    return -1;
}

int main() {
    int n; // number of elements
    std::cin >> n;

    std::vector<int> arr(n); // array to store elements
    for (int i = 0; i < n; ++i) {
        std::cin >> arr[i];
    }

    int target;
    std::cin >> target;

    int index = binarySearch(arr, target);
    if (index != -1)
        std::cout << "YES";
    else
        std::cout << "NO";


    return 0;
}
