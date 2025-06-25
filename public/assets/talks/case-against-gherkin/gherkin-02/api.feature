Feature: Manage Fruit via API

  Background:
    Given the API base URL is "https://example.com/api/v1"

  Scenario: Retrieve a list of Fruit
    When the system sends a GET request to "/fruits"
    Then the response status code should be 200
    And the response should contain a list of fruit
    And the list should include "Apple"
  
  Scenario: Add a new Fruit
    Given the request payload is:
      """
      {
        "name": "Banana",
        "id": 101
      }
      """
    When the system sends a POST request to "/fruits" with the payload
    Then the response status code should be 201
    And the response should contain:
    """
    {
      "message": "Fruit added successfully.",
      "fruit": {
        "name": "Banana",
        "id": 101
      }
    }
    """