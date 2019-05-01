from django.urls import path

from api import views

urlpatterns = [
    path('tasks_lists/', views.list_of_tasks_lists),
    path('tasks_lists/<int:pk>/', views.list_of_tasks_lists_detail),
    path('tasks_lists/<int:pk>/tasks/', views.tasks_list),
    path('tasks/<int:pk>/', views.task_detail),
]