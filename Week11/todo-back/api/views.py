from django.shortcuts import render
from .serializers import TaskListSerializer, TaskSerializer, SimpleTaskSerializer
from .models import Task, TaskList
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def list_of_tasks_lists(request):
    if request.method == "GET":
        tasks_list = TaskList.objects.all()
        serializer = TaskListSerializer(tasks_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def list_of_tasks_lists_detail(request, pk):
    try:
        tasks_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})
    if request.method == "GET":
        serializer = TaskListSerializer(tasks_list)
        return Response(serializer.data)

@api_view(['GET'])
def tasks_list(request, pk):
    try:
        tasks_list = TaskList.objects.get(id = pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})

    if request.method == "GET":
        tasks = tasks_list.task_set.all()
        serializer = SimpleTaskSerializer(tasks, many=True)
        return Response(serializer.data)

@api_view(["GET"])
def task_detail(request, pk):
    try:
        task = Task.objects.get(id = pk)
    except Task.DoesNotExist as error:
        return Response({"error": str(error)})

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)
