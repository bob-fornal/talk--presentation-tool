function startRaceCondition() {
  const wrapper = document.getElementById('general-wrapper');

  const element1 = document.createElement('div');
  element1.setAttribute('id', 'race1');
  element1.innerText = "Original Content (expect this to change via code)";

  const element2 = document.createElement('div');
  element1.setAttribute('id', 'race2');
  element2.innerText = "Original Content (expect this to change via code)";

  const change1 = document.getElementById('race1');
  wrapper.appendChild(element1);
  wrapper.appendChild(element2);
  const change2 = document.getElementById('race2');

  try {
    change1.innerText = 'Changed Content Correctly (via code)';
  } catch (error) {
    console.error(error);
  }
  try {
    change2.innerText = 'Changed Content Correctly (via code)';
  } catch (error) {
    console.error(error);
  }
}
