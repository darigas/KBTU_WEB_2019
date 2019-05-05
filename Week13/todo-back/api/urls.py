from django.urls import path

from .views import list_of_tasks_lists, tasks_list, task_detail, list_of_tasks_lists_detail, login, logout, register

urlpatterns = [
    path('tasks_lists/', list_of_tasks_lists),
    path('tasks_lists/<int:pk>/', list_of_tasks_lists_detail),
    path('tasks_lists/<int:pk>/tasks/', tasks_list),
    path('tasks/<int:pk>/', task_detail),
    path('login/', login),
    path('logout/', logout),
    path('register/', register),
]