Rails.application.routes.draw do
  # /auth/**/*.json
  mount Credible::Engine => "/auth"

  scope format: false, defaults: { format: 'html' } do
    # Catch all requests and render Vue app.
    root to: 'application#render_application'
    get '*path', to: 'application#render_application'
  end
end

