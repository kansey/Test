Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  get 'tetris/first'                => 'tetris#simple_same'
  get 'organizer/global'            => 'organizer#global'
  post 'organizer/task'             => 'organizer#got_task'
  post 'organizer/subject'          => 'organizer#got_subject'
  post 'organizer/subject_area'     => 'organizer#got_subject_area'
  post 'organizer/subject_area/new' => 'organizer#subject_area_new'
  post 'organizer/subject/new'      => 'organizer#subject_new'
  post 'organizer/task/new'         => 'organizer#task_new'
  delete 'organizer/subject'        => 'organizer#subject_destroy'
  delete 'organizer/subject_area'   => 'organizer#subject_area_destroy'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
