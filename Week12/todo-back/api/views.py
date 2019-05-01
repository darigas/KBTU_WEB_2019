from django.shortcuts import render
from .serializers import TaskListSerializer, TaskSerializer, SimpleTaskSerializer
from .models import Task, TaskList
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET', 'POST'])
def list_of_tasks_lists(request):

    if request.method == "GET":
        tasks_list = TaskList.objects.all()
        serializer = TaskListSerializer(tasks_list, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TaskListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def list_of_tasks_lists_detail(request, pk):
    try:
        tasks_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})

    if request.method == "GET":
        serializer = TaskListSerializer(tasks_list)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TaskListSerializer(instance=tasks_list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        tasks_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def tasks_list(request, pk):
    try:
        tasks_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})

    if request.method == "GET":
        tasks = tasks_list.task_set.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(task_list=tasks_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUESTß)

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(id = pk)
    except Task.DoesNotExist as error:
        return Response({"error": str(error)})

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_400_BAD_REQUEST)