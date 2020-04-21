require 'rails_helper'

RSpec.describe "Authentication::Users", type: :system do
  before do
    driven_by(:selenium_chrome_headless)
  end

  it "renders a title" do
    visit "/signup"

    expect(page).to have_text("New User")
  end

  it "allows signup" do
    visit "/signup"

    fill_in "Email", :with => "john.smith@example.com"
    fill_in "Password", :with => "Passw0rd123!"
    click_button "Sign up"

    expect(page).to have_text("CREDIBLE DEMO")
  end
end
