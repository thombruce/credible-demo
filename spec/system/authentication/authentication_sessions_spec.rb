require 'rails_helper'

RSpec.describe "Authentication::Sessions", type: :system do
  before do
    driven_by(:selenium_chrome_headless)
    create(:user, email: 'john.smith@example.com', password: 'Passw0rd123!')
  end

  it "renders a title" do
    visit "/login"

    expect(page).to have_text("New Session")
  end

  it "allows login with valid user" do
    visit "/login"

    fill_in "Login", :with => "john.smith@example.com"
    fill_in "Password", :with => "Passw0rd123!"
    click_button "Log in"

    expect(page).to have_text("CREDIBLE DEMO")
  end
end
